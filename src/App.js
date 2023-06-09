import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [isEmpty, setEmpty] = useState(false);

  const getDatas = async () => {
    const datas = await axios.get("https://fakestoreapi.com/products");
    const product = await datas.data;

    product[1].title = 'Mens Casual Premium Slim Fit T-Shirts'

    setData(product);
    setLoading(false);
  };

  const searchHandler = (event) => {
    const filtered = data.filter(function (e) {
      setLoading(false)
      // const converted = e.title

      // return converted == event.target.value

      const converted = e.title
      const targeting = event.target.value.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());

      // console.log(converted)
      // console.log(targeting.charAt(0).toUpperCase() + targeting.slice(1));
      console.log(targeting)

      return targeting == converted;
    });

   const capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
  }




    if (event.target.value !== "") {
      setLoading(false);
      if (filtered.length > 0) {
        setData(filtered);
        setEmpty(false);
        console.log("ada datanya nih", filtered.length);
        setLoading(false)
      } else {
        setLoading(true);
        setEmpty(true);
        // const ingfo = document.querySelector('.ingfo')
        // ingfo.textContent = ''
      }
    } else {
      axios
        .get("https://fakestoreapi.com/products")
        .then((res) => res.data)
        .then((res) => {
          setData(res);
          setEmpty(false);
          setLoading(false)
        });
      }
      // setLoading(true)
  };

  useEffect(() => {
    getDatas();
  }, []);

  return (
    <div className="App">
      <p>simply store</p>
      <form>
        <input
          type={"text"}
          placeholder="cari berdasarkan kategori"
          onChange={searchHandler}
        />
      </form>

      {/* {loading || isEmpty ? <p>sabar...</p> :   data.map(function (item) {
        return(
          <>
          <div className='box' style={{width: '500px', height: '350px', boxShadow:'1px 1px 32px rgba(0,0,0,.2)' ,margin: '1rem'}}>
            <p>{item.title}</p>
            <i>{item.category}</i>
            <img src={item.image} width={200} height={150}/>
          </div>
          </>
        )
      })} */}

      {/* if(loading){
        <p>sabar...</p>
      } else if(isEmpty){
        <p>data kosong..</p>
      } else if(!loading){
        <p>udah ga loading</p>
      } */}

      {loading ? (
        <p className="ingfo">Sabar...</p>
      ) : (
        data.map((item) => {
          return (
            <>
              <div
                className="box"
                style={{
                  width: "500px",
                  height: "350px",
                  boxShadow: "1px 1px 32px rgba(0,0,0,.2)",
                  margin: "1rem",
                }}
              >
                <p>{item.title}</p>
                <i>{item.category}</i>
                <img src={item.image} alt={'gambar banget'} width={200} height={150} />
              </div>
            </>
          );
        })
      )}
      {isEmpty ? <p >tidak ada data</p> : null}
  
    </div>
  );
}

export default App;
