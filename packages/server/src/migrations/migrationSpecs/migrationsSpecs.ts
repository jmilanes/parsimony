export const updateActive = [
  {
    $set: {
      active: {
        $ifNull: ["$behavior.active", true]
      }
    }
  }
];
