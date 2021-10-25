import Modal from "react-modal";

interface Props{
  selectedItem:object|undefined,
  handleModal:()=>void
}

function ItemsData(props:Props) {
 
  return (
    <>
      <Modal
        isOpen={!!props.selectedItem}
        ariaHideApp={false}
        contentLabel="Example Modal"
      >
        <pre>{JSON.stringify(props.selectedItem,null,2)}</pre>
        <button onClick={props.handleModal}>Close</button>
      </Modal>
      <div></div>
    </>
  );
}
export default ItemsData;
