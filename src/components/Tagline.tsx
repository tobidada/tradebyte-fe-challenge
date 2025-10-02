type TaglineProps = {
  text: string;
};

const Tagline = ({ text }: TaglineProps) => {
  return <h1 className="text-3xl text-center italic m-6">{text}</h1>;
};

export default Tagline;
