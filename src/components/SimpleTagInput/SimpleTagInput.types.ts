import type {
    ButtonHTMLAttributes,
    InputHTMLAttributes,
    ReactNode,
} from 'react'

export type SimpleTagInputTheme =
    | 'default'
    | 'light'
    | 'dark'
    | 'cupcake'
    | 'emerald'
    | 'corporate'
    | 'retro'
    | 'dracula'

export interface SimpleTagInputProps
    extends Omit<
        InputHTMLAttributes<HTMLInputElement>,
        'value' | 'onChange'
    > {
    className?: string

    value: string[]
    onChange: (tags: string[]) => void

    direction?: 'ltr' | 'rtl'
    theme?: SimpleTagInputTheme
    accentColor?: string

    placeholder?: string
    hintText?: ReactNode

    tagIcon?: ReactNode
    removeIcon?: ReactNode
    clearIcon?: ReactNode

    separators?: string[]
    maxTags?: number
    allowDuplicates?: boolean

    normalizeTag?: (tag: string) => string

    validateTag?: (
        tag: string,
    ) => boolean | string

    onInvalidTag?: (
        tag: string,
        reason?: string,
    ) => void

    onTagAdd?: (
        tag: string,
        index: number,
    ) => void

    onTagRemove?: (
        tag: string,
        index: number,
    ) => void

    acceptOnBlur?: boolean

    clearable?: boolean
    onClear?: () => void

    removeButtonProps?: Omit<
        ButtonHTMLAttributes<HTMLButtonElement>,
        'type' | 'onClick' | 'disabled' | 'className'
    > & {
        className?: string
    }
}