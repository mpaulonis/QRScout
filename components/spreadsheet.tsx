import { GoogleSpreadsheet } from 'google-spreadsheet'
import { cssTransition, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import isReachable from 'is-reachable'

// Open the correct Google Sheet by ID
// The string in the command below is the part of the Google Sheet URL after /d/ and before /edit
const doc = new GoogleSpreadsheet('1n3vnxGbNDAMzxUrlr2Hr-7XJHRHUMkjKROjaXen85i4');

// Write scouting data to the Google Sheet
export default async function SheetWrite (dataString: string, columnNames: string) {

    if (!await isReachable('google.com')) {
        toast.error(
            'Internet not available - please use the QR code',
            {
                bodyClassName: 'text-xl',
                theme: 'colored',
                position: toast.POSITION.TOP_CENTER
            }
        )
    } else {
        toast(
            'Attempting to write scouting data - stand by',
            {
                type: toast.TYPE.INFO,
                autoClose: false,
                bodyClassName: 'text-xl',
                theme: 'colored',
                position: toast.POSITION.TOP_CENTER,
                toastId: 'write'
            }
        );
        // Get service account email and key for authentication
        // In development, these get loaded automatically from .env.local
        // In production, they are configured in the Vercel environment
        const servAcct: string = (process.env.NEXT_PUBLIC_GOOGLE_SERVICE_ACCOUNT_EMAIL as string);
        const acctKey: string = (process.env.NEXT_PUBLIC_GOOGLE_PRIVATE_KEY as string);

        // Authentication using a service account definted on Google Cloud Platform is required
        // Instructions: https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
        await doc.useServiceAccountAuth({
            client_email: servAcct,
            private_key: acctKey.replace(/\\n/g, "\n"),
        });

        // Required to loadInfo() as first step
        doc.resetLocalCache();
        await doc.loadInfo();

        // Scouting data file should just have one sheet with index 0
        const sheet = doc.sheetsByIndex[0];

        // Convert tab-delimited string of column names to an array as needed by setHeaderRow
        const colArray = columnNames.split("\t")
        // Set the header row - OK to set it again if already present
        await sheet.setHeaderRow(colArray,1)

        // Convert tab-delimited string of scouting data to an array as needed by addRow
        const dataArray = dataString.split("\t")
        // Add scouting data array in the first open row in the Google Sheet
        const newRow = await sheet.addRow(dataArray)

        // Validate row addition
        // Get the row number that was just added
        const rowNum = newRow.rowIndex
        // Read back that row
        // Note offset is offset from first data row which is 2 (row 1 is the header)
        const newData = await sheet.getRows( {offset: rowNum-2, limit: 1})
        // Get the array representing the row rather than the row object
        const newArray = newData[0]._rawData
        // Compare the first four elements of the written data and the input data
        // Could compare all, but boolean values are lowercase in input and uppercase when read back
        const isEqual = JSON.stringify(newArray.slice(0,4)) === JSON.stringify(dataArray.slice(0,4))

        // Let the scouter know if writing was successful or not
        // Would be great to find a way to make a custom modal dialog for this
        if (isEqual) {
           toast.update('write', {
               render: () => <p>Successfully wrote<br/>row {rowNum} to<br/>{doc.title}</p>,
               type: toast.TYPE.SUCCESS,
               autoClose: 5000
           })
        } else {
            toast.update('write', {
                render: 'Was not able to write to the Google Sheet - please use the QR code',
                type: toast.TYPE.ERROR,
                autoClose: 5000
                }
            )
        }
    }
};