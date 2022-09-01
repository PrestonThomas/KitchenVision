import React from 'react';
import { Text } from 'react-native';
import { DynamsoftBarcodeReader, DynamsoftCameraView } from 'dynamsoft-capture-vision-react-native';

const credentials = require('./config.json');

// This file is concerned with the barcode scanning function.
// It handles the opening of the camera and the scanning of the barcode.

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
                if (this.state.results === null || this.state.results === []) {
                    console.log(this.state.results);
                    console.log(results.length);
                    this.setState({ results });
                } else if (results.length === 1) {
                    console.log(this.state.results);
                    output.push(results);
                    this.setState({ results });
                    this.reader.stopScanning();
                }
            });
            this.reader.startScanning();
        })();
    }

    scanBarcode() {
        console.log(this.state.results);
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
                style={{ flex: 1, }}
                ref={(ref) => { this.scanner = ref; }}
                overlayVisible={true}>
                <Text style={{ flex: 0.9, marginTop: 100, textAlign: 'center', color: 'white', fontSize: 18 }}>
                    {results && results.length > 0 ? resultBoxText : 'No Barcode Detected'}</Text>
            </DynamsoftCameraView>
        );
    }
    retrieveScannedBarcode() {
        return this.state.results;
    }
}
export default { BarcodeScanner, output };
