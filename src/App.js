import './assets/css/reset.css';
import './assets/css/font.css'
import './App.css';
import { db } from './assets/js/firebase';
import { onAuthStateChanged, signOut, getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from './assets/js/firebase';
import { query, collection, getDocs, doc, getDoc, addDoc, setDoc, orderBy } from 'firebase/firestore';
import { cloneElement, useEffect, useState } from 'react';
import LinkBoxModal from './components/LinkBoxModal';
import LinkBox from './components/LinkBox';
import AddLinkModal from './components/AddLinkModal';

function App() {
  
  const [linkBoxModal, setLinkBoxModal] = useState(false);
  const [addLinkModal, setAddLinkModal] = useState(false);
  const [linkData, setLinkData] = useState(false);
  const [links, setLinks] = useState({});
  const [uid, setUid] = useState('');
  const [uName, setUName] = useState('');
  const [linkReload, setLinkReload] = useState(false);


  useEffect(() => {
    // 로그인 확인
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
        setUName(user.displayName);
      } else {
        setUid('dummyUid');
        setUName('');
      }
    })

    // 링크 불러오기
    const getLinks = async () => {
      if ( uid ) {
        const linksRef = collection(db, 'users', uid, 'links');
        const q = query(linksRef, orderBy("timestamp"));
        const linksSnap = await getDocs(q);

        var newLinks = {};
        linksSnap.forEach((link) => {
          var data = link.data();
          var key = link.id;
          newLinks[key] = data;
        })
        setLinks(newLinks);
      }
    };
    getLinks();
  }, [uid, linkReload])
  
  
  // 로그인
  function login() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }


  // 로그아웃
  function logout() {
    signOut(auth).then(() => {
    }).catch((error) => {
      console.log(error);
    });
  }

  return (
    <div className="App">
        <header>
          <div className='header-content'>
            <div>Link Pass</div>
            {uName}
            {/* <div>menu</div> */}
            <div>
              {
                uid === "dummyUid"
                ? <div className='login-btn' onClick={login}>log in</div>
                : <div className='logout-btn' onClick={logout}>log out</div>
              }
            </div>
          </div>
        </header>
        <main>
          <section>
            <ul className='link-boxes'>
              { Object.keys(links).length !== 0
              ?
              Object.keys(links).map((linkId) => {
                return (
                  <LinkBox key={linkId} linkId={linkId} data={links[linkId]} uid={uid} setLinkBoxModal={setLinkBoxModal} setLinkData ={setLinkData} linkReload={linkReload} setLinkReload={setLinkReload}></LinkBox>
                )
              })
              :
              <p>새로운 회의를 추가해보세요!</p>
              }
            </ul>
          </section>
          <section>
            <div className='bottom-menu'>
              <div
                className='add-link-btn'
                onClick={()=>{
                  if ( uid !== "dummyUid" ) {
                    setAddLinkModal(true);
                  } else {
                    alert('로그인 후에 링크를 추가할 수 있습니다.');
                  }
                }}
              >
                <span className="material-symbols-outlined">
                  add
                </span>
              </div>
            </div>
          </section>

          {/* modal */}
          { linkBoxModal === true ? <LinkBoxModal uid={uid} data={linkData} setLinkBoxModal={setLinkBoxModal} setLinkData={setLinkData} linkReload={linkReload} setLinkReload={setLinkReload}/> : null }
          { addLinkModal === true ? <AddLinkModal uid={uid} setAddLinkModal={setAddLinkModal} linkReload={linkReload} setLinkReload={setLinkReload}/> : null }

        </main>
    </div>
  );
}

export default App;
