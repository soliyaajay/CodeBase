import { Matrics, Fonts, Color } from "../../common/styles";
export default (styles = {
  styleLogo: {
    width: Matrics.ScaleValue(60),
    height: Matrics.ScaleValue(60),
    resizeMode: 'contain',
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 1,
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
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Matrics.ScaleValue(20),
  },
  styleMain: {
    flex: 1,
    width: '90%',
    alignItems: 'center',
    marginTop: Matrics.ScaleValue(20),
  },
  styleBottom: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Matrics.ScaleValue(20),
  },
});
module.exports = styles;
