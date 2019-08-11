import React, { ChangeEvent, useCallback } from "react";
import style from "./WantedItems.module.scss";
import Item from "./Item";
import { getMaterialsInput, WantedItem } from "../data";

let offeredItems = getMaterialsInput();

interface Props {
  wantedItems: WantedItem[];
  includeSecretShop: boolean;
  showComponents: boolean;
  onQuantityChange: (itemId: number, quantity: number) => void;
}

const WantedItems: React.FC<Props> = ({
  onQuantityChange,
  wantedItems,
  includeSecretShop,
  showComponents
}) => {
  const onWantChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const itemId = +target.name;
    const quantity = +target.value;

    onQuantityChange(itemId, quantity);
  };

  const getValue = useCallback(
    (itemId: number) => {
      let wantedItem = wantedItems.find(wi => wi.itemId === itemId);
      if (wantedItem == null || wantedItem.quantity == null) {
        return "";
      }

      return wantedItem.quantity.toString();
    },
    [wantedItems]
  );

  return (
    <div>
      <h2>Materials</h2>
      <div>
        {offeredItems
          .filter(item => (item.mrrl || showComponents) && (!item.secret || includeSecretShop))
          .map(item => (
            <div key={item.itemId} className={`col-6 ${style.item}`}>
              <input
                type="number"
                className={style.input}
                name={item.itemId.toString()}
                onChange={onWantChange}
                value={getValue(item.itemId)}
              />
              <Item itemId={item.itemId} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default WantedItems;
