import MuiAccordion, { type AccordionProps as MuiAccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import type { FC, PropsWithChildren, ReactNode } from 'react';
import { ExpandMore } from './icons';

interface AccordionProps extends Pick<MuiAccordionProps, 'expanded' | 'onChange'> {
  expandIcon?: ReactNode;
  title: string | ReactNode;
}

export const Accordion: FC<PropsWithChildren<AccordionProps>> = ({
  expanded,
  onChange,
  expandIcon = <ExpandMore />,
  title,
  children,
}) => {
  return (
    <MuiAccordion
      expanded={expanded}
      onChange={onChange}
    >
      <MuiAccordionSummary expandIcon={expandIcon}>{title}</MuiAccordionSummary>
      <MuiAccordionDetails>{children}</MuiAccordionDetails>
    </MuiAccordion>
  );
};
