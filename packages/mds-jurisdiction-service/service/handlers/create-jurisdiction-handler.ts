/*
    Copyright 2019-2020 City of Los Angeles.

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
 */

import { ServiceResponse, ServiceResult, ServiceException } from '@mds-core/mds-service-helpers'
import logger from '@mds-core/mds-logger'
import { RepositoryError } from '@mds-core/mds-repository'
import { CreateJurisdictionDomainModel, JurisdictionDomainModel } from '../../@types'
import { JurisdictionRepository } from '../repository'
import { ValidateJurisdictionForCreate } from '../validators'

export const createJurisdiction = async (
  model: CreateJurisdictionDomainModel
): Promise<ServiceResponse<JurisdictionDomainModel>> => {
  try {
    const [jurisdiction] = await JurisdictionRepository.createJurisdictions([model].map(ValidateJurisdictionForCreate))
    return ServiceResult(jurisdiction)
  } catch (error) /* istanbul ignore next */ {
    const exception = ServiceException('Error Creating Jurisdiction', RepositoryError(error))
    logger.error(exception, error)
    return exception
  }
}
