import { TemporaryPasswordService } from "./temporaryPassword.service";

describe("TemporaryPasswordService", () => {
  // Create a temporary password for a given email with default duration.
  it("should create a temporary password for a given email with default duration", () => {
    const temporaryPasswordService = new TemporaryPasswordService();
    temporaryPasswordService.create("test@example.com");
    expect(
      temporaryPasswordService.TempPasswords["test@example.com"]
    ).toBeDefined();
  });

  // Create a temporary password for a given email with a custom duration.
  it("should create a temporary password for a given email with a custom duration", () => {
    const temporaryPasswordService = new TemporaryPasswordService();
    temporaryPasswordService.create("test@example.com", 5000);
    expect(
      temporaryPasswordService.TempPasswords["test@example.com"]
    ).toBeDefined();
  });

  // Validate a temporary password for a given email.
  it("should validate a temporary password for a given email", () => {
    const temporaryPasswordService = new TemporaryPasswordService();
    temporaryPasswordService.create("test@example.com");
    const isValid = temporaryPasswordService.validate(
      "test@example.com",
      temporaryPasswordService.TempPasswords["test@example.com"]
    );
    expect(isValid).toBe(true);
  });

  // Validate a temporary password for a non-existent email.
  it("should validate a temporary password for a non-existent email", () => {
    const temporaryPasswordService = new TemporaryPasswordService();
    const isValid = temporaryPasswordService.validate(
      "test@example.com",
      "123456"
    );
    expect(isValid).toBe(false);
  });

  // Validate a non-existent temporary password for a given email.
  it("should validate a non-existent temporary password for a given email", () => {
    const temporaryPasswordService = new TemporaryPasswordService();
    temporaryPasswordService.create("test@example.com");
    const isValid = temporaryPasswordService.validate(
      "test@example.com",
      "123456"
    );
    expect(isValid).toBe(false);
  });

  // Create a temporary password for a given email with a duration of 0.
  it("should create a temporary password for a given email with a duration of 0", (done) => {
    const temporaryPasswordService = new TemporaryPasswordService();
    temporaryPasswordService.create("test@example.com", 1000);
    expect(
      temporaryPasswordService.TempPasswords["test@example.com"]
    ).toBeDefined();

    setTimeout(() => {
      expect(
        temporaryPasswordService.TempPasswords["test@example.com"]
      ).not.toBeDefined();
      done();
    }, 1500);
  });
});
