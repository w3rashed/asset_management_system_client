import useMyTeam from "@/Hooks/useMyTeam";


const MyTeam = () => {
  const [myTeam] = useMyTeam();
  console.log(myTeam);
  return (
    <div>
      <h2>my team</h2>
    </div>
  );
};

export default MyTeam;
