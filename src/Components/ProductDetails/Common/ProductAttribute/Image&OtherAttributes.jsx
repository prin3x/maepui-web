import { Fragment } from "react";
import Image from "next/image";
import Btn from "@/Elements/Buttons/Btn";
import { placeHolderImage } from "../../../../../Data/CommonPath";

const ImageOtherAttributes = ({
  setVariant,
  productState,
  elem,
  soldOutAttributesIds,
}) => {
  return (
    <ul className={`select-package ${elem?.style ?? ""}`}>
      {elem?.attribute_values?.map((item, index) => (
        <Fragment key={index}>
          {productState?.attributeValues?.includes(item?.id) && (
            <li
              className={`${
                productState?.variantIds?.includes(item?.id) ? "active" : ""
              } ${soldOutAttributesIds?.includes(item.id) ? "disabled" : ""}`}
              title={item?.value}
            >
              {
                <Btn
                  onClick={() =>
                    setVariant(productState?.product?.variations, item)
                  }
                >
                  {item?.value}
                </Btn>
              }
            </li>
          )}
        </Fragment>
      ))}
    </ul>
  );
};

export default ImageOtherAttributes;
