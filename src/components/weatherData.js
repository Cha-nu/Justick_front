const weatherData = [
    {
      id: 1,
      weather: "맑음", // 날씨 (맑음, 흐림, 비 등)
      temperature: 18, // 온도 (섭씨)
      humidity: 50, // 습도 (%)
      windSpeed: 2, // 풍속 (m/s)
      icon: "/icons/sunny.png", // 날씨에 맞는 아이콘 경로 (맑은 날씨 아이콘)
    },
    {
      id: 2,
      weather: "흐림", // 날씨
      temperature: 15, // 온도
      humidity: 60, // 습도
      windSpeed: 3, // 풍속
      icon: "/icons/cloudy.png", // 흐린 날씨 아이콘
    },
    {
      id: 3,
      weather: "비", // 날씨
      temperature: 20, // 온도
      humidity: 80, // 습도
      windSpeed: 4, // 풍속
      icon: "/icons/rainy.png", // 비오는 날씨 아이콘
    },
  ];
  
  export default weatherData;
  