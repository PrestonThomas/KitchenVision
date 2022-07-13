import React from 'react';
import { Text, Button } from 'react-native';
import { DynamsoftBarcodeReader, DynamsoftCameraView, EnumBarcodeFormat } from 'dynamsoft-capture-vision-react-native';

const credentials = require('./config.json');


let output = [];
class BarcodeScanner extends React.Component {
    state = {
        results: null,
    };
    componentDidMount() {
        (async () => {
            try {
                await DynamsoftBarcodeReader.initLicense(credentials.licenseKey);
            } catch (e) {
                console.log(e);
            }
            this.reader = await DynamsoftBarcodeReader.createInstance();
            this.reader.addResultListener((results) => {
                if(this.state.results === null || this.state.results === []) {
                    console.log(this.state.results);
                    console.log(results.length);
                    this.setState({results});
                } else if (results.length === 1) {
                    console.log(this.state.results);
                    output.push(results);
                    this.setState({results});
                    this.reader.stopScanning();
                }
            });
            this.reader.startScanning();
        })();
    }

    scanBarcode() {
        console.log(this.state.results)
        return this.state.results;
    }

    async componentWillUnmount() {
        await this.reader.stopScanning();
        this.reader.removeAllResultListeners();
    }
    render() {
        let results = this.state.results;
        let resultBoxText = '';
        if (results && results.length > 0) {
            for (let i = 0; i < results.length; i++) {
                resultBoxText += results[i].barcodeFormatString + '\n' + results[i].barcodeText + '\n';
                this.output = results[i].barcodeText;
            }
        }
        return (
            <DynamsoftCameraView
                style={{flex: 1,}}
                ref={(ref) => { this.scanner = ref }}
                overlayVisible={true}>
                {/*Add a text box to display the barcode result.*/}
                <Text style={{ flex: 0.9, marginTop: 100, textAlign: 'center', color: 'white', fontSize: 18}}>
                    {results && results.length > 0 ? resultBoxText : 'No Barcode Detected'}</Text>
            </DynamsoftCameraView>
        );
    }
    retrieveScannedBarcode() {
        return this.state.results;
    }
}
export default {BarcodeScanner, output};
