import * as React from "react";
import { useHistory, useParams } from "react-router";
import useAppSelector from "../../global/helpers/useAppSelector";
import { propOrFalse } from "../../utils/common";
import ComboPreview from "../ComboSuite/ComboPreview";
import { useHotkeys } from "react-hotkeys-hook";
import { Combo } from "../../global/reducers/mainReducerTypes";

const ViewCombo: React.FC = () => {
  const { combo: comboId } = useParams<{ combo: string }>();
  const { push } = useHistory();
  const { currentCombo, nextCombo, previousCombo } = useAppSelector((state) => {
    const currentCombo = state.combos.find((e) => e.id === comboId);
    const combosForCharacter = state.combos.filter(
      (e) => e.character === currentCombo?.character
    );
    const currentComboIndex = combosForCharacter.findIndex(
      (e) => e.id === currentCombo?.id
    );
    const nextCombo = propOrFalse(
      `${currentComboIndex + 1}`,
      combosForCharacter
    );
    const previousCombo = propOrFalse(
      `${currentComboIndex - 1}`,
      combosForCharacter
    );
    return { currentCombo, nextCombo, previousCombo };
  });
  useHotkeys("down", () => {
    if (nextCombo) {
      push(`/combo-view/${nextCombo.id}`);
    }
  });
  useHotkeys("up", () => {
    if (previousCombo) {
      push(`/combo-view/${previousCombo.id}`);
    }
  });
  React.useEffect(() => {
    document.body.classList.add("exclusive");
    return () => {
      document.body.classList.remove("exclusive");
    };
  }, []);
  if (!currentCombo) return null;
  return (
    <ComboPreview
      combo={currentCombo.inputs}
      num={1}
      name={currentCombo.name}
      comboView
    />
  );
};

export default ViewCombo;
