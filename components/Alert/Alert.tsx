import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AlertStyle from 'components/Alert/Alert.style'
import React from 'react'

type AlertProps = {
  title?: string;
  icon?: IconDefinition;
  style?: "red" | "yellow" | "default";
}

const colorsForStyle = (style: string): string[] => {
  switch (style) {
    default:
      return ["white", "rgba(255, 255, 255, 0.2)"]
  }
}

const Alert: React.FC<AlertProps> = ({
  title,
  icon,
  children,
  style,
}) => {

  let [primaryColor, secondaryColor] = colorsForStyle(style);

  return (
    <AlertStyle.Container className={`alert alert-${style}`} {...{ primaryColor, secondaryColor }}>
      {icon && <AlertStyle.Icon>
        <FontAwesomeIcon icon={icon} size={"lg"} />
      </AlertStyle.Icon>}
      <AlertStyle.Content>
        <p className={"title"}>{title}</p>
        {children}
      </AlertStyle.Content>
    </AlertStyle.Container>
  )
}

export default Alert