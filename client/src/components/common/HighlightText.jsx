


const HighlightText = ({ text }) => {
  return (
    <span
      className="bg-gradient-to-tr from-[#4E1A70] to-[#2B4CF2]
                 bg-clip-text text-transparent font-bold
                 text-2xl sm:text-2xl md:text-3xl lg:text-4xl"
    >
      {text}
    </span>
  );
};

export default HighlightText;
