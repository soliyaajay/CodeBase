import { Matrics, Fonts, Color } from "../../common/styles";
export default (styles = {
  styleLogo: {
    width: Matrics.ScaleValue(100),
    height: Matrics.ScaleValue(100),
    resizeMode: 'contain',
  },
  info: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.white,
  },
  mainView: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.white,
  },
  styleName: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  styleBottom: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Matrics.ScaleValue(20),
  },
});
module.exports = styles;
