import { GoogleSpreadsheet } from 'google-spreadsheet';

//const creds = require('./client_secret.json');

// Create a document object using the ID of the spreadsheet - obtained from its URL.

const doc = new GoogleSpreadsheet('1n3vnxGbNDAMzxUrlr2Hr-7XJHRHUMkjKROjaXen85i4');

export default async function sheetWrite () {
    console.log(process.env)
    await doc.useServiceAccountAuth({
        //client_email: process.env.NEXT_PUBLIC_GOOGLE_SERVICE_ACCOUNT_EMAIL,
        //private_key: process.env.NEXT_PUBLIC_GOOGLE_PRIVATE_KEY,
        client_email: 'cybertribe@sheetsapi-352615.iam.gserviceaccount.com',
        private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCsNkCn1Ao41eb+\nHQzPGRHn/zUdiR1VwDQFE9AUB2DNRnPMD1wnpY67ueuTDaTDhVlXusi7+3CisO+F\n7Ks/669YTD1OvnPzWaaSAyhWWOHS97wEUgmpl77Hp9sjVg23atGCR3X0fmmswcpJ\nnDI4ouGLrXkjyaddWyeppa405tpIK/Dm6ir1Ui8KpvFtSJfTKOKleTUxqz8vmcjz\nlfPv1eWVYvFiRtl2FkZw1CLldw0dlsgnVPA7EOaT7BKECjHLG47rDwIokvu7GSwk\nFlB91tLqG69/iYU9Ok0alPhsTWCOdyKqHKy0gglIrCyM6I97NNaXk+E9odgW4go6\nw319uZsPAgMBAAECggEAHI16NtlPQJEmlWdXolazw1VrBxSeyoLtnRHl5Aw9HovZ\n0zGQw/oNKk7vIhiXAtvvLj6H3bMYv8C6VeghlJ2NGwS4/X9SVjy9A2SGoZpnBsWQ\nZN79PyMrvIq2KKux5oFNb15NzlXPS5dt5LqDESTgZHpEpYxftXjRoK0Zrye/dUud\n8RxcK5V8OQSE6EC9cElOhv4At6Ms6JHS7Pv4pY08Y6q4f2+1VikSk6Rj7ufNA38E\nCN2TIK445W6ABpiizAIAPZtLZbgnAhmGy9kL2+87hC15L1PzQMKEE4rQFUiw9ozX\n75dR761oRA2u9E8k062JrIZM78S30JETKqrc1DXQ0QKBgQDjoaHBMI0eQzn+3xzW\n0YdTOsaifdOrCTHIRLJ6Jw3O8PIkToZM7squLMivuZMothn/8oMvokv2GS3Wffsb\noLdH4pbgp9dCDegwKbT4AT56rTCDBcXdJUa9Qjp6/jRtKr4ZfT9LaP9oCSOVYWr5\nEaAlcN/pnrX3EGVh4xO7ZHCd8wKBgQDBrIO01MxrtSxBFdYNCHIjjaXPfr2ygD7t\nKBsV2uzj35i1FvOPpDeNORcZMJvBFMrGm2hYpS1Rpd8i+jdjVQQZzsJF8w5C7ffO\nqfN4UPvfuGU6Z3SHhG0EInOQ+3wVkas36FLQGK8QmqntZg7IbxXQiAFZoKxHDkmu\nPRA5PRSpdQKBgQCSETfAxiznzG+8suLIni9eIwsvXdqjmATP4/U7GTBtKIPY9GKN\nn3WDis1Epapep2vLp4yy1kw0ITgeuTyXH+w8PpRemJUyl8X0ke7Ebdfv1I6apOuw\n2qin7YWlQtXVb2YI6Svicf/ifGrPAnIoXT0MiX/FY8iUP3su8w3IY804LQKBgQCc\n3fhHjVyNmM7hYKhhIggg1+gHKmbHn6xYNnXJu+rHnyF2+8IHBEGidy1IT+C4APlE\n6DcaJZ+RVEJpeDVIlWGe7aLZOUbB2zEuCOWU/DMmP5puNcFiylXqVWU5dxhH+Baw\nT9JTjsqtLjiYemNa4O7QWniNeeBQJTh0ki0Dz39eyQKBgEpx8y48zAj+E18i9U5M\nzTxB99dW21IljpTSGx8WfEXBeCBCMyNbPNNz4Ts9ZQW3Kic8jAOAQzxD7gDSAlFH\nA3OyVVktpbbC4HHnppOrcuaFIEjn24Z3mpMYZJWIMwlagsd862CZ0rBDweP5jp0C\n/xEziRM2KaT+nEp4hg+haF9G\n-----END PRIVATE KEY-----\n',
    });
    await doc.loadInfo(); // loads document properties and worksheets
    //console.log(doc.title);
    const sheet = doc.sheetsByIndex[0];  // only one sheet 
    const newRow = await sheet.addRow(['3', 'data from QRScout'])
};
