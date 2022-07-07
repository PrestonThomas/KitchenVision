import React from 'react';
import { Text } from 'react-native';
import { DynamsoftBarcodeReader, DynamsoftCameraView, EnumBarcodeFormat } from 'dynamsoft-capture-vision-react-native';
import ActionSheet from 'react-native-actions-sheet';


class Barcode extends React.Component {
    output = '';
    state = {
        results: null
    };
    componentDidMount() {

        (async () => {
            try {
                await DynamsoftBarcodeReader.initLicense('DLS2eyJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSJ9');
            } catch (e) {
                console.log(e);
            }
            this.reader = await DynamsoftBarcodeReader.createInstance();
            this.reader.addResultListener((results) => {
                this.setState({ results });
                this.output = results;
            });
            this.reader.startScanning();
        })();
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
                style={
                    {
                        flex: 1,
                    }
                }
                ref={(ref) => { this.scanner = ref }}
                overlayVisible={true}
            >
                {/*Add a text box to display the barcode result.*/}
                <Text style={
                    {
                        flex: 0.9,
                        marginTop: 100,
                        textAlign: "center",
                        color: "white",
                        fontSize: 18,
                    }
                }>{results && results.length > 0 ? resultBoxText : "No Barcode Detected"}</Text>
            </DynamsoftCameraView>
        );
    }
}
export default Barcode;
