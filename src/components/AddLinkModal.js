import { collection, addDoc } from "firebase/firestore";
import { db } from '../assets/js/firebase';

function AddLinkModal(props) {
    const setAddLinkModal = props.setAddLinkModal;
    const linkReload = props.linkReload;
    const setLinkReload = props.setLinkReload;
    const uid = props.uid;

    const createLink = async () => {
        var title = document.querySelector('#newTitle').value;
        var desc = document.querySelector('#newDesc').value;
        var url = document.querySelector('#newUrl').value;

        if ( !title || !url ) {
            window.alert('URL과 링크 이름을 입력해주세요.');
            return
        }

        await addDoc(collection(db, 'users', uid, 'links'), {
          title: title,
          desc: desc,
          url: url,
          timestamp: Date.now(),
        })

        // 링크 새로고침
        setLinkReload(!linkReload);

        // 모달 닫기
        document.querySelector('#newTitle').value = "";
        document.querySelector('#newDesc').value = "";
        document.querySelector('#newUrl').value = "";
        setAddLinkModal(false);
    }

    return (
        <div className='modal add-link-modal'>
            <div className='modal-content'>
                <div className='modal-close-btn' onClick={()=>setAddLinkModal(false)}>
                    <span className="material-symbols-outlined">
                        close
                    </span>
                </div>

                <div className='modal-header'>
                    <h1 className='modal-title'>링크 추가하기</h1>
                </div>
                <div className='modal-main'>
                    <div className='modal-section'>
                        <h2>회의 URL 붙여넣기</h2>
                        <input type='text' id="newUrl"></input>
                    </div>
                    <div className='modal-section'>
                        <h2>링크 이름</h2>
                        <input type='text' id="newTitle"></input>
                    </div>
                    <div className='modal-section'>
                        <h2>설명</h2>
                        <input type='text' id="newDesc"></input>
                    </div>
                    <div className='modal-section'>
                        <button className="add-link-submit-btn" onClick={createLink}>추가</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddLinkModal