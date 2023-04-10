import { ThreeDots } from 'react-loader-spinner';
export const Loader = () => {
  return (
    <ThreeDots
      height="80"
      width="80"
      radius="9"
      color="#ff28d8"
      ariaLabel="three-dots-loading"
      wrapperStyle={{ display: 'flex', justifyContent: 'center' }}
      visible={true}
    />
  );
};
