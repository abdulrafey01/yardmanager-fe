import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  vehicleData: [
    {
      sku: 1,
      part: "Alternator",
      year: "2022-2024",
      model: ["Alfa Romeo", "Chevrolet"],
      make: ["Alfa Romeo", "Honda"],
      variant: "Frot-Mirror",
      notes:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis est sint distinctio laborum tenetur dolorem sapiente laboriosam odio quod beatae doloremque fuga consequuntur iusto quaerat alias, adipisci sunt, error omnis!",
      location: "Mumbai",
    },
    {
      sku: 2,
      part: "Motor",
      year: "2022-2024",
      model: ["Alfa Romeo", "Chevrolet"],
      make: ["Alfa Romeo", "Toyota"],
      variant: "Frot-Mirror",
      notes:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias sunt, odio modi aliquam perspiciatis eum dicta, consectetur quia libero temporibus debitis magnam nulla perferendis rerum tenetur delectus itaque quasi at!",
      location: "Mumbai",
    },
    {
      sku: 1,
      part: "Alternator",
      year: "2022-2024",
      model: ["Alfa Romeo", "Chevrolet"],
      make: ["Alfa Romeo", "Honda"],
      variant: "Frot-Mirror",
      notes:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis est sint distinctio laborum tenetur dolorem sapiente laboriosam odio quod beatae doloremque fuga consequuntur iusto quaerat alias, adipisci sunt, error omnis!",
      location: "Mumbai",
    },
    {
      sku: 2,
      part: "Motor",
      year: "2022-2024",
      model: ["Alfa Romeo", "Chevrolet"],
      make: ["Alfa Romeo", "Toyota"],
      variant: "Frot-Mirror",
      notes:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias sunt, odio modi aliquam perspiciatis eum dicta, consectetur quia libero temporibus debitis magnam nulla perferendis rerum tenetur delectus itaque quasi at!",
      location: "Mumbai",
    },
    {
      sku: 1,
      part: "Alternator",
      year: "2022-2024",
      model: ["Alfa Romeo", "Chevrolet"],
      make: ["Alfa Romeo", "Honda"],
      variant: "Frot-Mirror",
      notes:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis est sint distinctio laborum tenetur dolorem sapiente laboriosam odio quod beatae doloremque fuga consequuntur iusto quaerat alias, adipisci sunt, error omnis!",
      location: "Mumbai",
    },
    {
      sku: 2,
      part: "Motor",
      year: "2022-2024",
      model: ["Alfa Romeo", "Chevrolet"],
      make: ["Alfa Romeo", "Toyota"],
      variant: "Frot-Mirror",
      notes:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias sunt, odio modi aliquam perspiciatis eum dicta, consectetur quia libero temporibus debitis magnam nulla perferendis rerum tenetur delectus itaque quasi at!",
      location: "Mumbai",
    },
    {
      sku: 1,
      part: "Alternator",
      year: "2022-2024",
      model: ["Alfa Romeo", "Chevrolet"],
      make: ["Alfa Romeo", "Honda"],
      variant: "Frot-Mirror",
      notes:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis est sint distinctio laborum tenetur dolorem sapiente laboriosam odio quod beatae doloremque fuga consequuntur iusto quaerat alias, adipisci sunt, error omnis!",
      location: "Mumbai",
    },
    {
      sku: 2,
      part: "Motor",
      year: "2022-2024",
      model: ["Alfa Romeo", "Chevrolet"],
      make: ["Alfa Romeo", "Toyota"],
      variant: "Frot-Mirror",
      notes:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias sunt, odio modi aliquam perspiciatis eum dicta, consectetur quia libero temporibus debitis magnam nulla perferendis rerum tenetur delectus itaque quasi at!",
      location: "Mumbai",
    },
    {
      sku: 1,
      part: "Alternator",
      year: "2022-2024",
      model: ["Alfa Romeo", "Chevrolet"],
      make: ["Alfa Romeo", "Honda"],
      variant: "Frot-Mirror",
      notes:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis est sint distinctio laborum tenetur dolorem sapiente laboriosam odio quod beatae doloremque fuga consequuntur iusto quaerat alias, adipisci sunt, error omnis!",
      location: "Mumbai",
    },
    {
      sku: 2,
      part: "Motor",
      year: "2022-2024",
      model: ["Alfa Romeo", "Chevrolet"],
      make: ["Alfa Romeo", "Toyota"],
      variant: "Frot-Mirror",
      notes:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias sunt, odio modi aliquam perspiciatis eum dicta, consectetur quia libero temporibus debitis magnam nulla perferendis rerum tenetur delectus itaque quasi at!",
      location: "Mumbai",
    },
  ],
};

export const vehicleSlice = createSlice({
  name: "vehicle",
  initialState,
  reducers: {
    deleteVehicle: (state, action) => {
      state.vehicleData.splice(action.payload, 1);
    },
  },
});

export const { deleteVehicle } = vehicleSlice.actions;
export default vehicleSlice.reducer;
