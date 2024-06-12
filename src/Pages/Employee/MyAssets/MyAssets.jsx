import useMyAssets from "@/Hooks/useMyAssets";

const MyAssets = () => {
  const [myAssets, refetch] = useMyAssets();
  console.log(myAssets);
  return (
    <div>
      <h2>MyAssets</h2>
    </div>
  );
};

export default MyAssets;
