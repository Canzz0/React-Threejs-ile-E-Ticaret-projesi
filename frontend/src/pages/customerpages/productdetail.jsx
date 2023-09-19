import React from 'react';
import ReactDOM from 'react-dom';
import * as THREE from 'three';
import axios from "axios";
import { useParams } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
function ProductDetailComponent() {
  const { productId } = useParams(); // React Router'dan parametreleri alıyoruz
  const [product, setProduct] = useState([]);
  const canvasRef = useRef(null);
  const controlsRef = useRef(null) //Controller için
  const [isVisible, setIsVisible] = useState(false); //Sayfanın animasyonu için ben yavaş yüklenme animasyonu kullandım
  const [popup, setPopup] = useState(false)
  const [isLoading, setIsLoading] = useState(true); // Yükleme durumunu ekleme
  function togglePopup() {
    setPopup(prevPopup => !prevPopup);
  }


  const addBasket = async (productId, sellerid) => {
    let userid = JSON.parse(sessionStorage.getItem("id"));
    let model = { productId: productId, sellerId: sellerid, userId: userid };
    var response = await axios.post("http://localhost:5000/baskets/add", model);
    alert(response.data.message);
  }


  useEffect(() => {
    const getProductDetail = async () => {
      const response = await axios.get("http://localhost:5000/products");
      var i = 0;
      for (i = 0; i < response.data.length; i++) {
        if (response.data[i]._id === productId) {
          setProduct(response.data[i]);
          setIsLoading(false);
          break;
        }
      }

    };

    getProductDetail();
  }, [productId]);

  useEffect(() => {
    setIsVisible(true); //animasyonu etkin hale getirir
    if (product) { // Ürün verileri mevcutsa sahneyi oluşturun
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('white');
      const camera = new THREE.PerspectiveCamera(75, (window.innerWidth) / (window.innerHeight), 0.1, 100);
      const renderer = new THREE.WebGLRenderer({ physicallyCorrectLights: true, antialias: true, powerPreference: "high-performance" });
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.setSize(window.innerWidth, window.innerHeight);

      // Burada canvasRef'in mevcut olup olmadığını kontrol edin ve appendChild işlemini gerçekleştirin
      if (canvasRef.current) {
        canvasRef.current.appendChild(renderer.domElement);
      }
      camera.position.x = 4;
      camera.position.y = 0;
      camera.position.z = 6;

      const light = new THREE.HemisphereLight('white', 1);
      scene.add(light);
      function loadModel() {
        const figurUrl = 'http://localhost:5000/' + product.figurUrl;
        const FBXloader = new FBXLoader();
        FBXloader.load(figurUrl, (figure) => { //dance isimli fbx dosyasımızı yükleyip dönüştürme işlemi yaptık ismini figure yaptık
          figure.scale.set(8, 8, 8) //Burada Yüklediğimiz fbx dosyasının boyunu küçülttük
          figure.position.set(0, 0, 0)
          scene.add(figure); //figur'ü scene yani ekrana ekledik
        })
      }
      loadModel();
      //    //ORBİT KONTOLLERİ
      const controls = new OrbitControls(camera, renderer.domElement); //mouse ile kamera kontrolü yapabilmemizi sağlar
      controls.enableDamping = true; //Yumuşak kamera hareketi için

      controls.autoRotate = true; //kameranın sürekli dönmesini sağlar 
      controls.autoRotateSpeed = 4;//Dönme hızını belirler
      controls.update(); //Render gibi sürekli güncelleme
      controlsRef.current = controls;
      const animate = () => {
        requestAnimationFrame(animate);
        controlsRef.current.update(); //Mouse ile kamera kontrolü
        renderer.render(scene, camera);
      };

      animate();
    }
  }, [product]);

  return (
    <>
      {isLoading ? (
        <div>Yükleniyor...</div>
      ) : (
        <div className="w-100 row m-4">
          <div className={`product ${isVisible ? 'active' : ''}`}>
            <div className="product-image">
              <img style={{ width: "456px" }} src={'http://localhost:5000/' + product.imageUrl} />
            </div>
            <div className="product-details">
              <h1 className="product-title">{product.name}</h1>
              <p className="product-categoryName">{product.categoryName}</p>
              <p className="product-price">Fiyat:{product.price}</p>
              <button className="btn btn-success m-2" onClick={togglePopup}>İncele</button>
              <br />
              <button onClick={() => addBasket(product._id, product.sellerid)} className="add-to-cart" >Sepete Ekle</button>
            </div>
          </div>
          <div className="row mt-5 p-4">
            <div className="product-content">
              <div className="product-description">
                <h3><strong>Ürün Detayları</strong> </h3>
                {product.description}
              </div>
              <div className='mt-5'>
                <img style={{ rotate: "-45deg" }} src={'http://localhost:5000/' + product.imageUrl} />
                <img style={{ rotate: "45deg" }} src={'http://localhost:5000/' + product.imageUrl} />
              </div>
            </div>
          </div>
          <div className={`${popup ? 'popup-active' : 'popup'}`}>
            <div className="figur-overlay">
              <div className="figur-content">
                <div className="figur-close" onClick={togglePopup}>
                  &times;
                </div>
                <div ref={canvasRef}></div>
              </div>
            </div>
          </div>

        </div>
      )}
    </>
  );
}
export default ProductDetailComponent;