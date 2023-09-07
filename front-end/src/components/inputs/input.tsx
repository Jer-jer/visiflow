import React from 'react'

interface InputProps {
    inputType: string,
    topLeftLabel: string,
    leftLabel?: string,
    bottomRightLabel?: string,
    placeHolder?: string,
    globalCustomStylings?: string,
    inputCustomStylings?: string,
}

function Input({inputType, topLeftLabel, leftLabel, bottomRightLabel, placeHolder, globalCustomStylings, inputCustomStylings}: InputProps) {
  return (
    <div>
        <div className={`flex justify-center items-center align-middle ${globalCustomStylings}`}>
            <div className='w-2/5 pr-3'>
                <label className="label">
                    <span className="label-text">{leftLabel}</span>
                </label>
            </div>
            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text">{topLeftLabel}</span>
                </label>
                <input type={inputType} placeholder={placeHolder} className={`input ${inputCustomStylings}`}  />
                <label className="label">
                    <span className="label-text-alt">&nbsp;</span>
                    <span className="label-text-alt">{bottomRightLabel}</span>
                </label>
            </div>
        </div>
    </div>
  )
}

export default Input