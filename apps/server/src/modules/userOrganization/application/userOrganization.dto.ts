import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class UserOrganizationCreateDto {
  @IsString()
  @IsOptional()
  role?: string

  @IsString()
  @IsOptional()
  dateCreated?: string

  @IsString()
  @IsOptional()
  dateDeleted?: string

  @IsString()
  @IsOptional()
  dateUpdated?: string

  @IsString()
  @IsOptional()
  userId?: string

  @IsString()
  @IsOptional()
  organizationId?: string
}

export class UserOrganizationUpdateDto {
  @IsString()
  @IsOptional()
  role?: string

  @IsString()
  @IsOptional()
  dateCreated?: string

  @IsString()
  @IsOptional()
  dateDeleted?: string

  @IsString()
  @IsOptional()
  dateUpdated?: string

  @IsString()
  @IsOptional()
  userId?: string

  @IsString()
  @IsOptional()
  organizationId?: string
}
