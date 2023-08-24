import { japan } from './japan';

const getPrefId = (prefName: string) => {
  const result = japan.filter((value) => value.name === prefName);

  if (result.length > 0) {
    return result[0].id;
  }

  return '';
};

const getPrefName = async (prefId: string) => {
  const result = japan.filter((value) => value.name === prefId);

  if (result.length > 0) {
    return result[0].name;
  }

  return '';
};

const getCitiesArr = async (prefId: string) => {
  if (!prefId) {
    return;
  }

  const url = `https://www.land.mlit.go.jp/webland/api/CitySearch?area=${prefId}`;
  try {
    const response = await fetch(url, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    return data.data;
  } catch (error) {
    console.error('Failed to fetch: ', error);
  }
};
export const getAddress = {
  getPrefId,
  getPrefName,
  getCitiesArr,
};
