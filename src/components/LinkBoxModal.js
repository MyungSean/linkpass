import { doc, updateDoc } from "firebase/firestore";
import { db } from "../assets/js/firebase";

function LinkBoxModal(props) {
    const setLinkBoxModal = props.setLinkBoxModal;
    const setLinkData = props.setLinkData;
    const linkReload = props.linkReload;
    const setLinkReload = props.setLinkReload;
    const data = props.data;
    const uid = props.uid;

    async function updateLink(type) {
        var val = document.querySelector('#modal-'+type).innerHTML;
        if ( !uid || uid === "dummyUid") {
            return
        }

        if ( val && val !== data[type] ) {
            data[type] = val;
            setLinkData(data);

            await updateDoc( doc(db, "users", uid, "links", data.id), {
                [type]: val
            })

            // 링크 새로고침
            setLinkReload(!linkReload);
        } else {
            document.querySelector('#modal-'+type).value = data[type];
        }
    }

    // 링크로 복사
    function siteLinkCopy() {
        var url = data.url;
        var description = data.desc;
        var createInput = document.createElement("textarea");
        
        document.getElementsByClassName("shareSite")[0].appendChild(createInput);
        createInput.value = `${url}\n${description}`;
        
        createInput.select();
        document.execCommand('copy');
        document.getElementsByClassName("shareSite")[0].removeChild(createInput);
        
        alert('링크가 복사되었습니다.');
    }
    function shareByLink() {
        // 공유 기능 가능하면 공유 네비게이션 열고 불가능하면 공유 링크 복사
        if (navigator.share) {
            var title = data.title;
            var url = data.url;

            navigator.share({
                title: `${title}`,
                url: `${url}`
            })
            .catch(console.error);
        } else {
            siteLinkCopy();
        }
    }
    
    return (
        <div className='modal link-box-modal'>
            <div className='modal-content'>
                <div className='modal-close-btn' onClick={()=>setLinkBoxModal(false)}>
                    <span className="material-symbols-outlined">
                        close
                    </span>
                </div>

                <div className='modal-header'>
                    <div>
                        <span
                            role='textbox'
                            contentEditable="true"
                            suppressContentEditableWarning={true}
                            id="modal-title"
                            className='modal-title'
                            onBlur={()=>{
                                updateLink('title')
                            }}
                        >
                            {data.title}
                        </span>
                        { uid && uid !== "dummyUid" ? <span class="edit-btn material-symbols-outlined">edit</span> : null }
                    </div>
                    <div>
                        <span
                            role='textbox'
                            contentEditable="true"
                            suppressContentEditableWarning={true}               
                            id="modal-url"
                            className='modal-url'
                            onBlur={()=>{
                                updateLink('url')
                            }}
                        >
                            {data.url}
                        </span>
                        { uid && uid !== "dummyUid" ? <span class="edit-btn material-symbols-outlined">edit</span> : null }
                    </div>
                </div>
                <div className='modal-main'>
                    <div className='modal-section'>
                        <div>
                            <span
                                role='textbox'
                                contentEditable="true"
                                suppressContentEditableWarning={true}
                                id="modal-desc"
                                className='modal-desc'
                                onBlur={()=>{
                                    updateLink('desc')
                                }}
                            >
                                {data.desc}
                            </span>
                            { uid && uid !== "dummyUid" ? <span class="edit-btn material-symbols-outlined">edit</span> : null }
                        </div>
                    </div>
                    <div className='modal-section'>
                        <h2>링크 공유</h2>
                        <div>
                            <button onClick={shareByLink}>링크 복사</button>
                        </div>
                    </div>
                    <div className='modal-section'>
                        <a href={data.url} target='_blank' rel='noopener noreferrer'>
                            <button className='join-btn'>이동하기</button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LinkBoxModal