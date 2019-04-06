import { Injectable } from '@angular/core';
import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";

@Injectable({
  providedIn: 'root'
})
export class CognitoService {

  _POOL_DATA = {
    UserPoolId: "us-east-2_pJjcANPag",
    ClientId: "46o4uc4s3ap9294dj3ri0l3q3s"
  };

  constructor() { }

  signUp(email, password, fristname, lastname, phonenumber, sex) {

    return new Promise((resolved, reject) => {
      const userPool = new AmazonCognitoIdentity.CognitoUserPool(this._POOL_DATA);

      let userAttribute = [];
      userAttribute.push(
        new AmazonCognitoIdentity.CognitoUserAttribute({ Name: "email", Value: email })
      );
      userAttribute.push(
        new AmazonCognitoIdentity.CognitoUserAttribute({ Name: "custom:firstname", Value: fristname })
      );
      userAttribute.push(
        new AmazonCognitoIdentity.CognitoUserAttribute({ Name: "custom:lastname", Value: lastname })
      );
      userAttribute.push(
        new AmazonCognitoIdentity.CognitoUserAttribute({ Name: "phone_number", Value: phonenumber })
      );
      userAttribute.push(
        new AmazonCognitoIdentity.CognitoUserAttribute({ Name: "custom:sex", Value: sex })
      );

      userPool.signUp(email, password, userAttribute, null, function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolved(result);
        }
      });

    });

  }

  confirmUser(verificationCode, userName) {
    return new Promise((resolved, reject) => {
      const userPool = new AmazonCognitoIdentity.CognitoUserPool(this._POOL_DATA);

      const cognitoUser = new AmazonCognitoIdentity.CognitoUser({
        Username: userName,
        Pool: userPool
      });

      cognitoUser.confirmRegistration(verificationCode, true, function(err, result) {
        if (err) {
          reject(err);
        } else {
          resolved(result);
        }
      });
    });
  }

  authenticate(email, password) {
    return new Promise((resolved, reject) => {
      const userPool = new AmazonCognitoIdentity.CognitoUserPool(this._POOL_DATA);

      const authDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username: email,
        Password: password
      });

      const cognitoUser = new AmazonCognitoIdentity.CognitoUser({
        Username: email,
        Pool: userPool
      });

      cognitoUser.authenticateUser(authDetails, {
        onSuccess: result => {
          resolved(result);
        },
        onFailure: err => {
          reject(err);
        },
        newPasswordRequired: userAttributes => {

          userAttributes.email = email;
          delete userAttributes.email_verified;

          cognitoUser.completeNewPasswordChallenge(password, userAttributes, {
            onSuccess: function(result) {},
            onFailure: function(error) {
              reject(error);
            }
          });
        }
      });
    });
  }

}
