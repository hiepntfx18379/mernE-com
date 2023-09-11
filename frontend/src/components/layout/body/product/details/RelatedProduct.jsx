import { useNavigate } from "react-router-dom";

const RelatedProduct = ({ pro }) => {
  const navigate = useNavigate();

  // khi click chuyen huong dong thoi gui id
  const navigatateToDetailPage = () => {
    navigate(`/product/${pro.name}`);
  };
  return (
    <div
      className="animate-[zoomOut_2s_ease-in-out]"
      onClick={navigatateToDetailPage}
    >
      <img src={pro.photos[1]} className="hover:opacity-60" alt="" />
      <div className=" font-semibold mt-4 mb-2">{pro.name}</div>
      <div className="price">
        {new Intl.NumberFormat("en-DE").format(pro.price)} VND
      </div>
    </div>
  );
};

export default RelatedProduct;
