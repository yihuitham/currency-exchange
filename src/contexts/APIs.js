export function getCurrencyAPIURL(base, target) {
  const API_KEY = "VJ1Bc8eSWux2wfBNc73Marc6BVIzj1dBnd4oscd5";

  if (target === "") {
    return;
  }
  return `https://api.currencyapi.com/v3/latest?apikey=${API_KEY}&currencies=${target}&base_currency=${base}`;
}

export async function fetchExchangeRate(baseCurr, targetCurr) {
  try {
    const response = await fetch(getCurrencyAPIURL(baseCurr, targetCurr));
    const data = await response.json();
    const exchangeRate = data.data[targetCurr].value;
    console.log("exchange rate: ", exchangeRate);
    return exchangeRate;
  } catch (error) {
    console.log(error);
  }
}

export const getRequest = async () => {
  try {
    const response = await fetch(
      "https://dyj6i4wuc7.execute-api.ap-southeast-1.amazonaws.com/dev"
    );
    const data = await response.json();
    console.log(data);
    return data.Items;
  } catch (error) {
    console.log(error);
  }
};

export const postRequest = async (baseAmt, baseCurr, targetAmt, targetCurr) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      baseAmt,
      baseCurr,
      targetAmt,
      targetCurr,
    }),
  };
  try {
    const response = await fetch(
      "https://dyj6i4wuc7.execute-api.ap-southeast-1.amazonaws.com/dev",
      requestOptions
    );
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
