const mockData = [
  // 배추 - high
  {
    id: 1,
    name: '배추',
    unit: '포기',
    yesterdayPrice: '12000원',
    yesterdayIntake: '1,100kg',
    todayPrice: '13,000원',
    tomorrowPrice: '13400원',
    grade: 'high',
    priceDiff: 1000,
    priceRate: 3
  },
  // 배추 - special
  {
    id: 2,
    name: '배추',
    unit: '포기',
    yesterdayPrice: '3,601원',
    yesterdayIntake: '950kg',
    todayPrice: '3,901원',
    tomorrowPrice: '4,101원',
    grade: 'special',
    priceDiff: 300,
    priceRate: 8.3
  },

  // 고추 - high
  {
    id: 3,
    name: '감자',
    unit: 'kg',
    yesterdayPrice: '5,2001원',
    yesterdayIntake: '700kg',
    todayPrice: '5,500원',
    tomorrowPrice: '5,800원',
    grade: 'high',
    priceDiff: -16501,
    priceRate: -31.7
  },
  // 고추 - special
  {
    id: 4,
    name: '감자',
    unit: 'kg',
    yesterdayPrice: '6,101원',
    yesterdayIntake: '680kg',
    todayPrice: '6,301원',
    tomorrowPrice: '6,601원',
    grade: 'special',
    priceDiff: 200,
    priceRate: 3.3
  },

  // 고추2 - high
  {
    id: 5,
    name: '고추2',
    unit: 'kg',
    yesterdayPrice: '5,2002원',
    yesterdayIntake: '700kg',
    todayPrice: '5,500원',
    tomorrowPrice: '5,800원',
    grade: 'high',
    priceDiff: -16502,
    priceRate: -31.7
  },
  // 고추2 - special
  {
    id: 6,
    name: '고추2',
    unit: 'kg',
    yesterdayPrice: '6,101원',
    yesterdayIntake: '680kg',
    todayPrice: '6,301원',
    tomorrowPrice: '6,601원',
    grade: 'special',
    priceDiff: 200,
    priceRate: 3.3
  },

  // 고추3 - high
  {
    id: 7,
    name: '고추3',
    unit: 'kg',
    yesterdayPrice: '5,2003원',
    yesterdayIntake: '700kg',
    todayPrice: '5,500원',
    tomorrowPrice: '5,800원',
    grade: 'high',
    priceDiff: -16503,
    priceRate: -31.7
  },
  // 고추3 - special
  {
    id: 8,
    name: '고추3',
    unit: 'kg',
    yesterdayPrice: '6,101원',
    yesterdayIntake: '680kg',
    todayPrice: '6,301원',
    tomorrowPrice: '6,601원',
    grade: 'special',
    priceDiff: 200,
    priceRate: 3.3
  },

  // 무 - high
  {
    id: 9,
    name: '무',
    unit: '10개',
    yesterdayPrice: '27,000원',
    yesterdayIntake: '500kg',
    todayPrice: '28,000원',
    tomorrowPrice: '29,000원',
    grade: 'high',
    priceDiff: 1000,
    priceRate: 3.7
  },
  // 무 - special
  {
    id: 10,
    name: '무',
    unit: '10개',
    yesterdayPrice: '27,001원',
    yesterdayIntake: '470kg',
    todayPrice: '28,501원',
    tomorrowPrice: '29,501원',
    grade: 'special',
    priceDiff: 1500,
    priceRate: 5.6
  },

  // 양파 - high
  {
    id: 11,
    name: '양파',
    unit: '10kg',
    yesterdayPrice: '3,200원',
    yesterdayIntake: '1,000kg',
    todayPrice: '3,406원',
    tomorrowPrice: '3,600원',
    grade: 'high',
    priceDiff: 206,
    priceRate: 6.4
  },
  // 양파 - special
  {
    id: 12,
    name: '양파',
    unit: '10kg',
    yesterdayPrice: '4,001원',
    yesterdayIntake: '950kg',
    todayPrice: '4,201원',
    tomorrowPrice: '4,401원',
    grade: 'special',
    priceDiff: 200,
    priceRate: 5.0
  },

  // 당근 - high
  {
    id: 13,
    name: '당근',
    unit: 'kg',
    yesterdayPrice: '5,600원',
    yesterdayIntake: '800kg',
    todayPrice: '5,846원',
    tomorrowPrice: '6,000원',
    grade: 'high',
    priceDiff: 246,
    priceRate: 4.4
  },
  // 당근 - special
  {
    id: 14,
    name: '당근',
    unit: 'kg',
    yesterdayPrice: '6,401원',
    yesterdayIntake: '750kg',
    todayPrice: '6,701원',
    tomorrowPrice: '6,901원',
    grade: 'special',
    priceDiff: 300,
    priceRate: 4.7
  },

  // 고구마 - high
  {
    id: 15,
    name: '고구마',
    unit: '1개',
    yesterdayPrice: '3,300원',
    yesterdayIntake: '300kg',
    todayPrice: '3,584원',
    tomorrowPrice: '3,800원',
    grade: 'high',
    priceDiff: 284,
    priceRate: 8.6
  },
  // 고구마 - special
  {
    id: 16,
    name: '고구마',
    unit: '1개',
    yesterdayPrice: '4,201원',
    yesterdayIntake: '280kg',
    todayPrice: '4,501원',
    tomorrowPrice: '4,701원',
    grade: 'special',
    priceDiff: 300,
    priceRate: 7.1
  },

  // 토마토 - high
  {
    id: 17,
    name: '토마토',
    unit: 'kg',
    yesterdayPrice: '5,000원',
    yesterdayIntake: '600kg',
    todayPrice: '5,384원',
    tomorrowPrice: '5,600원',
    grade: 'high',
    priceDiff: 384,
    priceRate: 7.7
  },
  // 토마토 - special
  {
    id: 18,
    name: '토마토',
    unit: 'kg',
    yesterdayPrice: '5,901원',
    yesterdayIntake: '580kg',
    todayPrice: '6,201원',
    tomorrowPrice: '6,401원',
    grade: 'special',
    priceDiff: 300,
    priceRate: 5.1
  },

  // 찹쌀 - high
  {
    id: 19,
    name: '찹쌀',
    unit: 'kg',
    yesterdayPrice: '5,000원',
    yesterdayIntake: '400kg',
    todayPrice: '5,160원',
    tomorrowPrice: '5,400원',
    grade: 'high',
    priceDiff: 160,
    priceRate: 3.2
  },
  // 찹쌀 - special
  {
    id: 20,
    name: '찹쌀',
    unit: 'kg',
    yesterdayPrice: '5,901원',
    yesterdayIntake: '390kg',
    todayPrice: '6,101원',
    tomorrowPrice: '6,301원',
    grade: 'special',
    priceDiff: 200,
    priceRate: 3.4
  },

  // 쌀 - high
  {
    id: 21,
    name: '쌀',
    unit: '20kg',
    yesterdayPrice: '55,000원',
    yesterdayIntake: '1,200kg',
    todayPrice: '53,806원',
    tomorrowPrice: '54,000원',
    grade: 'high',
    priceDiff: -1194,
    priceRate: -2.2
  },
  // 쌀 - special
  {
    id: 22,
    name: '쌀',
    unit: '20kg',
    yesterdayPrice: '55,001원',
    yesterdayIntake: '1,100kg',
    todayPrice: '54,001원',
    tomorrowPrice: '54,501원',
    grade: 'special',
    priceDiff: -1000,
    priceRate: -1.8
  }
];

export default mockData;
