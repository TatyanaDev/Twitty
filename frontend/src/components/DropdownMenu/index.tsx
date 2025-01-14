import { useState } from "react";
import style from "./styles.module.css";

interface DropdownMenuProps {
  handleEditButton: () => void;
  handleDeleteButton: () => void;
}

export default function DropdownMenu({ handleEditButton, handleDeleteButton }: DropdownMenuProps) {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <div className={style["position-relative"]}>
      <button className={style["menu-toggle"]} onClick={() => setMenuVisible(!menuVisible)} aria-label="Toggle menu">
        ...
      </button>

      {menuVisible && (
        <div className={style["popup-menu"]}>
          <button className={style["menu-item"]} onClick={handleEditButton}>
            Edit
          </button>
          <button className={style["menu-item"]} onClick={handleDeleteButton}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
