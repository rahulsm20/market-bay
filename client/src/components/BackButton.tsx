import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate()

  const goBack = () => {
    navigate(-1)
  };

  return (
    <button onClick={goBack} className="btn btn-transparent hover:bg-white bg-slate-200 normal-case text-black btn-sm text-sm absolute lg:relative border-0"><img src="/back.svg" className='w-4'/>Back</button>
  );
};

export default BackButton;
