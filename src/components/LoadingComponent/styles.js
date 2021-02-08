import { Matrics, Fonts, Color } from "../../common/styles";
export default (styles = {
  LoaderContainer: {
    flex: 1,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    zIndex: 1
  },
  LoaderWrapper: {
    width: Matrics.ScaleValue(120),
    height: Matrics.ScaleValue(100),
    backgroundColor: Color.PRIMARY,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    borderRadius: Matrics.ScaleValue(10)
  },
});
module.exports = styles;
