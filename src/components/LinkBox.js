import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../assets/js/firebase";

function LinkBox(props) {
    const setLinkBoxModal = props.setLinkBoxModal;
    const setLinkData = props.setLinkData;
    const linkReload = props.linkReload;
    const setLinkReload = props.setLinkReload;
    const linkId = props.linkId;
    const data = props.data;
    const uid = props.uid;

    async function deleteLink() {
        if ( !uid || uid === "dummyUid") {
            return
        }

        if ( window.confirm("정말 해당 링크를 삭제하시겠습니까?") ) {
            await deleteDoc(doc(db, 'users', uid, 'links', linkId));

            // 링크 새로고침
            setLinkReload(!linkReload);
        }
    }

    return (
        <li
        className='link-box'
        onClick={ () => {
            setLinkBoxModal(true);
            setLinkData({id: linkId, title: data.title, desc: data.desc, url: data.url, timestamp: data.timestamp});
        }}
        >
            <div className='link-box-content'>
                <div>
                    <p className='link-box-title'>{data.title}</p>
                    <p className='link-box-desc'>{data.desc}</p>
                </div>
                <div>
                    { uid && uid !== "dummyUid"
                    ?
                    <span
                        class="link-delete-btn material-symbols-outlined"
                        onClick={(e)=>{
                            e.stopPropagation();
                            deleteLink();
                        }}
                    >
                            delete
                    </span>
                    : null }
                </div>
            </div>
        </li> 
    );
}

export default LinkBox