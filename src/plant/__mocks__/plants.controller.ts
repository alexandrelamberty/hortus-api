import { plantStub } from "../__tests__/stubs/plant.stub";

export const PlantsController = jest.fn().mockReturnValue({
  getAllPlants: jest.fn().mockResolvedValue([plantStub()]),
  getPlantById: jest.fn().mockResolvedValue(plantStub()),
  createPlant: jest.fn().mockResolvedValue(plantStub()),
  updatePlant: jest.fn().mockResolvedValue(plantStub()),
  deletePlant: jest.fn().mockResolvedValue(plantStub()),
});
