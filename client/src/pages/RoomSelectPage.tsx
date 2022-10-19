import RoomSelect from '../components/RoomSelect/RoomSelect';

type componentProps = {
  usernameState: any;
};

const RoomSelectPage = ({ usernameState }: componentProps) => {
  return (
    <>
      <RoomSelect usernameState={usernameState} />
    </>
  );
};

export default RoomSelectPage;
