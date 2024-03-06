export class AuthModule {
  private static instance: AuthModule;
  private accessToken: string | null;
  private refreshToken: string | null;

  private isAuthenticatedMemo: boolean | null = null;

  private constructor() {
    this.accessToken = localStorage.getItem("accessToken");
    this.refreshToken = localStorage.getItem("refreshToken");
  }

  public static getInstance(): AuthModule {
    if (!AuthModule.instance) {
      AuthModule.instance = new AuthModule();
    }
    return AuthModule.instance;
  }

  public async isAuthenticated(): Promise<boolean> {
    if (this.isAuthenticatedMemo !== null) {
      return this.isAuthenticatedMemo;
    }

    return new Promise((resolve, reject) => {
      if (this.accessToken && this.refreshToken) {
        this.getAboutMe()
          .then((data) => {
            this.processAboutMe(data, resolve, reject);
          })
          .catch((error) => {
            console.error("Error:", error);
            reject(false);
          });
      } else {
        resolve(!!this.accessToken);
      }
    });
  }

  private processAboutMe(
    data: any,
    resolve: (value: boolean) => void,
    reject: (reason?: any) => void
  ) {
    if (data && this.accessToken) {
      this.isAuthenticatedMemo = true;
      resolve(true);
    } else if (this.refreshToken) {
      this.getNewAccessToken(this.refreshToken).then((data) => {
        if (data) {
          this.isAuthenticatedMemo = true;
          // this.accessToken = data.access;
          console.log("new access token", data);
          resolve(true);
        } else {
          this.isAuthenticatedMemo = false;
          reject(false);
        }
      });
    } else {
      this.isAuthenticatedMemo = false;
      reject(false);
    }
  }

  public performLogout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    this.accessToken = null;
    this.refreshToken = null;
    this.isAuthenticatedMemo = false;
  }

  public getAccessToken(): string {
    if (!this.accessToken) {
      this.performLogout();
      return "";
    } else {
      return this.accessToken;
    }
  }

  public async getAboutMe(): Promise<any> {
    return new Promise((resolve, reject) => {
      fetch("https://api.moneyy.ai/api/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.accessToken,
        },
      })
        .then(async (response) => {
          if (response.ok) {
            const data = await response.json();
            resolve(data);
          } else {
            reject(false);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          reject(false);
        });
    });
  }

  public async getNewAccessToken(refreshFromCache: string): Promise<string> {
    return new Promise((resolve, reject) => {
      fetch("https://api.moneyy.ai/api/token/refresh", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refresh: refreshFromCache,
        }),
      })
        .then(async (response) => {
          if (response.ok) {
            const data = await response.json();
            this.setToken(data);
            resolve(data);
          } else {
            reject("Login failed.");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
  }

  public async sendOTP(
    email: string,
    password: string,
    phone_number: string,
    name: string,
    passwordReset: boolean = false,
    forceSend: boolean = false
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      fetch("https://api.moneyy.ai/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          phone_number,
          name,
          password,
          reset_password: passwordReset,
          force_resend: forceSend,
        }),
      }).then(async (response) => {
        const data = await response.json();
        if (response.ok) {
          resolve("success");
        } else if (data === "EMAIL_ALREADY_EXISTS") {
          reject("EMAIL_ALREADY_EXISTS");
        } else if (data === "PHONE_NUMBER_ALREADY_EXISTS") {
          reject("PHONE_NUMBER_ALREADY_EXISTS");
        } else if (data === "USER_NOT_FOUND") {
          reject("USER_NOT_FOUND");
        } else {
          console.error("Login failed.");
          if (data?.errors?.[0].contains("email")) {
            reject("EMAIL_EXISTS");
          }
          reject("GENERIC_ERROR");
        }
      });
    });
  }

  public async completeSignUp(
    email: string,
    otp: string,
    password: string | null
  ) {
    const requestBody = password ? { email, otp, password } : { email, otp };
    return new Promise((resolve, reject) => {
      fetch("https://api.moneyy.ai/api/signup/activate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })
        .then(async (response) => {
          const data = await response.json();
          if (response.ok) {
            resolve("success");
          } else if (data === "OTP_INCORRECT") {
            reject("OTP_INCORRECT");
          } else {
            reject("GENERIC_ERROR");
            console.error("Login failed.");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
  }

  public async performLogin(email: string, password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      fetch("https://api.moneyy.ai/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
        .then(async (response) => {
          if (response.ok) {
            const data = await response.json();
            if (data === "NO_ACTIVE_ACCOUNT") {
              reject("NO_ACTIVE_ACCOUNT");
            } else if (data === "CREDENTIALS_INVALID") {
              reject("CREDENTIALS_INVALID");
            } else {
              this.setToken(data);
              resolve(data);
            }
          } else {
            console.error("Login failed.");
            reject("Login failed.");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
  }

  private setToken(data: AuthResponse) {
    this.accessToken = data.access;
    this.refreshToken = data.refresh;
    this.cacheTokens(data);
  }

  private cacheTokens(data: AuthResponse) {
    localStorage.setItem("accessToken", data.access);
    localStorage.setItem("refreshToken", data.refresh);
  }
}

export interface AuthResponse {
  access: string;
  refresh: string;
}
