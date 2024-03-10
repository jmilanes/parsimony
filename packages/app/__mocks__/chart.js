// Mocking the Chart.js constructor
module.exports = jest.fn(() => ({
  // Mock any Chart.js methods you use
  destroy: jest.fn(),
  update: jest.fn()
  // Add other methods as needed
}));
