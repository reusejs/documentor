import React, { useCallback, useContext } from 'react';
import Select from '../../../playground-src/ui/Select';
import ToolbarContext from '../../../context/ToolbarContext';
import { FontOptions } from '../../../types';
import DropDown, { DropDownItem } from '../../../playground-src/ui/DropDown';

const defaultFontFamilyOptions: FontOptions = [
  ['Arial', 'Arial'],
  ['Courier New', 'Courier New'],
  ['Georgia', 'Georgia'],
  ['Times New Roman', 'Times New Roman'],
  ['Trebuchet MS', 'Trebuchet MS'],
  ['Verdana', 'Verdana'],
];

const FONT_FAMILY_OPTIONS: [string, string][] = [
  ['Arial', 'Arial'],
  ['Courier New', 'Courier New'],
  ['Georgia', 'Georgia'],
  ['Times New Roman', 'Times New Roman'],
  ['Trebuchet MS', 'Trebuchet MS'],
  ['Verdana', 'Verdana'],
];

function dropDownActiveClass(active: boolean) {
  if (active) return 'active dropdown-item-active';
  else return '';
}

interface IFontFamilyDropdown {
  fontOptions?: FontOptions;
}

const FontFamilyDropdown = ({
  fontOptions = defaultFontFamilyOptions,
}: IFontFamilyDropdown) => {
  const { fontFamily, applyStyleText } = useContext(ToolbarContext);

  const onFontFamilySelect = useCallback(
    (e) => {
      applyStyleText({ 'font-family': e });
    },
    [applyStyleText]
  );

  const style = 'font-family';

  const buttonAriaLabel =
    style === 'font-family'
      ? 'Formatting options for font family'
      : 'Formatting options for font size';

  return (
    <>
      {/* <Select
        className="toolbar-item font-family"
        onChange={onFontFamilySelect}
        options={fontOptions}
        value={fontFamily}
      />
      <i className="chevron-down inside" /> */}

      <DropDown
        buttonClassName={'toolbar-item ' + style}
        buttonLabel={fontFamily}
        buttonIconClassName={'icon block-type font-family'}
        buttonAriaLabel={'Formatting options for font family'}
      >
        {FONT_FAMILY_OPTIONS.map(([option, text]) => (
          <DropDownItem
            className={`item ${dropDownActiveClass(fontFamily === option)}`}
            onClick={() => {
              console.log('option', option);
              onFontFamilySelect(option);
            }}
            key={option}
          >
            <span className="text">{text}</span>
          </DropDownItem>
        ))}
      </DropDown>
    </>
  );
};

export default FontFamilyDropdown;
