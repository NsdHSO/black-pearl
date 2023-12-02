export function productionMilkMock() {
  return {
    totalCows: 38,
    totalCowsMilked: 12,
    cowsNotMilked: 26,
    totalAmLiters: 929.0,
    totalNoonLiters: 918.0,
    averageLiters: 244.66,
    highestMilkQuality: 800,
    lowestMilkQuantity: 60,
    totalLiters: 29236.0,
    cowWithHighestMilkQuantity: 'Margret Tac54',
  };
}

export function dietCow() {
  return {
    averageDailyFeed: {
      dryCowHay: 25,
      dryCowGrains: 8,
      lactatingCowHay: 50,
      lactatingCowGrains: 15,
    },
    keyNutrientsPercentage: {
      protein: 17,
      fiber: 22,
      fat: 4,
      calcium: 0.8,
      phosphorus: 0.4,
    },
    waterIntakeGallons: {
      min: 10,
      max: 20,
    },
  };
}
