import { Matrics, Fonts, Color } from "../../common/styles";
export default (styles = {
  mainContainer: {
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
},
modalContainer: {
    backgroundColor: 'white',
    marginHorizontal: Matrics.ScaleValue(20),
    borderRadius: Matrics.ScaleValue(8),
    alignItems: 'center',
    padding: Matrics.ScaleValue(10),
},
closeHeader: {
    height: Matrics.ScaleValue(50),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 20
},
headerText: {
    width: '90%',
    alignContent: 'center',
    color: 'black',
    fontSize: Matrics.ScaleValue(20),
    margin: Matrics.ScaleValue(25),
    textAlign: 'center'
},
modalImageView: {
    width: Matrics.ScaleValue(120),
    height: Matrics.ScaleValue(120),
    marginVertical: 20,
},
selectDateTextStyle: {
    textAlign: 'center',
    color: 'black',
    fontSize: Matrics.ScaleValue(15),
    paddingHorizontal: Matrics.ScaleValue(10),
},
selectedButtonStyle: {
    height: Matrics.ScaleValue(40),
    backgroundColor: 'black',
    borderRadius: Matrics.ScaleValue(5),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Matrics.ScaleValue(15),
    marginHorizontal: Matrics.ScaleValue(5),
},
selectedButtonTextStyle: {
    fontSize: Matrics.ScaleValue(16),
    color: 'white',
    fontWeight: '500'
},
});
module.exports = styles;
