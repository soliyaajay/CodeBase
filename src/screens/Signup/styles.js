import { Matrics, Fonts, Color } from "../../common/styles";
export default (styles = {
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: Matrics.ScaleValue(70),
    paddingHorizontal: Matrics.ScaleValue(20),
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
    width: '100%',
    alignItems: 'center',
    paddingVertical: Matrics.ScaleValue(20),
  },
  styleBottom: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  styleImage: {
    width: Matrics.ScaleValue(15),
    height: Matrics.ScaleValue(15),
    tintColor: Color.PRIMARY
  },
});
module.exports = styles;
