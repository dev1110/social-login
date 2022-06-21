export const userGoogleLoginRequest = async (data: any) => {
  try {
    const options: any = {
      method: "POST",
      body: data,
      mode: "cors",
      cache: "default",
    };

    return await fetch("http://localhost:4000/api/v1/auth/google", options).then(r => {
      const token = r.headers.get('x-auth-token');
      return r.json().then(user => {
        return { token, user }
      });
    });
  } catch (e: any) {
    return e;
  }
};

export const userFacebookLoginRequest = async (data: any) => {
  try {
    const options: any = {
      method: "POST",
      body: data,
      mode: "cors",
      cache: "default",
    };

    return await fetch("http://localhost:4000/api/v1/auth/facebook", options).then(r => {
      const token = r.headers.get('x-auth-token');
      return r.json().then(user => {
        return { token, user }
      });
    });
  } catch (e: any) {
    return e;
  }
};
