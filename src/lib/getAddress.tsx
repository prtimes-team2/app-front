export const getCity = async (prefectureId: string) => {
  const url = `https://www.land.mlit.go.jp/webland/api/CitySearch?area=${prefectureId}`;
  try {
    const response = await fetch(url, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Failed to fetch: ', error);
  }
};
