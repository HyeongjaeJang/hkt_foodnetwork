import i18n from "../translations";

const Tl = ({ children }) => {
  const { t } = i18n;
  return <>{t(children)}</>;
};

export default Tl;
