import { useMemo } from "react";
import { useCryptoStore } from "../store";
import Spinner from "./Spinner";
export default function CryptoPriceDisplay() {
  const result = useCryptoStore((state) => state.result);

  const loading = useCryptoStore((state) => state.loading);
  const hasResult = useMemo(() => !Object.values(result).includes(""), [
    result,
  ]);
  return (
    <div className="result-wrapper">
      {loading ? (
        <Spinner />
      ) : (
        hasResult && (
          <>
            <h2>Cotizacion</h2>{" "}
            <div className="result">
              <img
                src={`https://cryptocompare.com/${result.IMAGEURL}`}
                alt=""
              />
              <div>
                <p>
                  Precio: <span>{result.PRICE}</span>
                </p>
                <p>
                  Precio mas alto del dia: <span>{result.HIGHDAY}</span>
                </p>
                <p>
                  Precio mas bajo: <span>{result.LOWDAY}</span>
                </p>
                <p>
                  Variacion ultimas 24h: <span>{result.CHANGE24HOUR}</span>
                </p>
                <p>
                  Ultima Actualizacion: <span>{result.LASTUPDATE}</span>
                </p>
              </div>
            </div>
          </>
        )
      )}
    </div>
  );
}
