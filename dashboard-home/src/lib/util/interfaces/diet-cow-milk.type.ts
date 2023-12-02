export interface CowDiet {
  averageDailyFeed: {
    dryCowHay: number;
    dryCowGrains: number;
    lactatingCowHay: number;
    lactatingCowGrains: number;
  };
  keyNutrientsPercentage: {
    protein: number;
    fiber: number;
    fat: number;
    calcium: number;
    phosphorus: number;
  };
  waterIntakeGallons: {
    min: number;
    max: number;
  };
}
