import { Fragment, useEffect, useRef, useState } from "react"

import { Input } from "@/components/ui/input"

type OtpInputProps = {
  length: number
  otp: number
  onOtpChange: (otp: number) => void
}

let currentOtpIndex: number = 0

const Otp = ({ length, otp, onOtpChange }: OtpInputProps): JSX.Element => {
  const [tempOtp, setTempOtp] = useState<string[]>(
    new Array(length || 6).fill("")
  )
  const [activeOtpIndex, setActiveOtpIndex] = useState<number>(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleOnchange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = target
    const newOtp: string[] = [...tempOtp]
    newOtp[currentOtpIndex] = value.substring(value.length - 1)

    if (!value) setActiveOtpIndex(currentOtpIndex - 1)
    else setActiveOtpIndex(currentOtpIndex + 1)

    setTempOtp(newOtp)
    onOtpChange(
      isNaN(parseInt(newOtp.join(""))) ? 0 : parseInt(newOtp.join(""))
    )
    otp = isNaN(parseInt(tempOtp.join(""))) ? 0 : parseInt(tempOtp.join(""))
  }

  const handleOnKeyDown = (
    { key }: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    currentOtpIndex = index
    if (key === "Backspace") {
      setActiveOtpIndex(currentOtpIndex - 1)
    }
  }

  useEffect(() => {
    inputRef.current?.focus()
  }, [activeOtpIndex])

  return (
    <div className="flex w-full items-center space-x-2">
      {tempOtp.map((_, index) => {
        return (
          <Fragment key={index}>
            <Input
              ref={index === activeOtpIndex ? inputRef : null}
              onChange={handleOnchange}
              onKeyDown={(e) => handleOnKeyDown(e, index)}
              className="w-10 text-center text-lg font-bold"
              type="number"
              placeholder={"x"}
              value={tempOtp[index]}
            />
          </Fragment>
        )
      })}
    </div>
  )
}

export default Otp
