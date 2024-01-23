import styled from "styled-components";

const StyledFromRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:first-child {
    padding-top: 0;
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
    padding-bottom: 0;
  }
`;

export const Label = styled.label`
  font-weight: 500;
`;

export const InputError = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

export default function FormRow({ children, error, label, ...props }) {
  return (
    <StyledFromRow>
      {label && (
        <Label htmlFor={children.props.id} {...props}>
          {label}
        </Label>
      )}
      {children}
      {error && <InputError>{error}</InputError>}
    </StyledFromRow>
  );
}
